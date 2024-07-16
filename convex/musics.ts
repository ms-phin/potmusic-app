import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const createMusic = mutation({
  args: {
    musicTitle: v.string(),
    musicDescription: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    imagePrompt: v.string(),
    views: v.number(),
    audioDuration: v.number(),
    audioStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();
    if (user.length == 0) {
      throw new ConvexError("User not found");
    }

    const music = await ctx.db.insert("musics", {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageUrl: user[0].imageUrl,
    });

    return music;
  },
});

export const getMusic = query({
  handler: async (ctx) => {
    const musics = await ctx.db.query("musics").collect();
    return musics;
  },
});
export const getMusicById = query({
  args: {
    musicId: v.id("musics"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.musicId);
  },
});

// this query will get the music by the authorId.
export const getMusicByAuthorId = query({
  args: {
    musicId: v.id("musics"),
  },
  handler: async (ctx, args) => {
    const music = await ctx.db.get(args.musicId);

    return await ctx.db
      .query("musics")
      .filter((q) =>
        q.and(
          q.eq(q.field("authorId"), music?.authorId),
          q.neq(q.field("_id"), args.musicId)
        )
      )
      .collect();
  },
});

// this mutation will delete the podcast.
export const deleteMusic = mutation({
  args: {
    musicId: v.id("musics"),
    imageStorageId: v.id("_storage"),
    audioStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.musicId);

    if (!podcast) {
      throw new ConvexError("Podcast not found");
    }

    await ctx.storage.delete(args.imageStorageId);
    await ctx.storage.delete(args.audioStorageId);
    return await ctx.db.delete(args.musicId);
  },
});

// this query will get the podcast by the search query.
export const getMusicBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.search === "") {
      return await ctx.db.query("musics").order("desc").collect();
    }

    const authorSearch = await ctx.db
      .query("musics")
      .withSearchIndex("search_author", (q) => q.search("author", args.search))
      .take(10);

    if (authorSearch.length > 0) {
      return authorSearch;
    }

    const titleSearch = await ctx.db
      .query("musics")
      .withSearchIndex("search_title", (q) =>
        q.search("musicTitle", args.search)
      )
      .take(10);

    if (titleSearch.length > 0) {
      return titleSearch;
    }

    return await ctx.db
      .query("musics")
      .withSearchIndex("search_body", (q) =>
        q.search("musicDescription" || "musicTitle", args.search)
      )
      .take(10);
  },
});
// export const getMusicByUserId = query({
//   args: {
//     userId: v.string(), // Assuming userId is a string, adjust based on your data model
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db
//       .query("musics")
//       .filter((q) => q.eq(q.field("user"), args.userId))
//       .collect();
//   },
// });
export const getMusicByUserId = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const musics = await ctx.db
      .query("musics")
      .filter((q) => q.eq(q.field("authorId"), args.authorId))
      .collect();

    const totalListeners = musics.reduce((sum, music) => sum + music.views, 0);

    return { musics, listeners: totalListeners };
  },
});

// this mutation will update the views of the podcast.
export const updateMusicViews = mutation({
  args: {
    musicId: v.id("musics"),
  },
  handler: async (ctx, args) => {
    const music = await ctx.db.get(args.musicId);

    if (!music) {
      throw new ConvexError("music not found");
    }

    return await ctx.db.patch(args.musicId, {
      views: music.views + 1,
    });
  },
});
