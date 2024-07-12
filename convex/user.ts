
import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("user is not found");
    }
    return user;
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
    if (!user) {
      throw new ConvexError("user is not found");
    }
    await ctx.db.delete(user._id);
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
    if (!user) {
      throw new ConvexError("user is not found ");
    }
    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });
  },
});

// this query is used to get the top user by music count. first the music is sorted by views and then the user is sorted by total musics, so the user with the most musics will be at the top.
export const getTopUserByMusicCount = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const musics = await ctx.db
          .query("musics")
          .filter((q) => q.eq(q.field("authorId"), u.clerkId))
          .collect();

        const sortedMusics = musics.sort((a, b) => b.views - a.views);

        return {
          ...u,
          totalMusics: musics.length,
          music: sortedMusics.map((p) => ({
            musicTitle: p.musicTitle,
            musicId: p._id,
          })),
        };
      })
    );

    return userData.sort((a, b) => b.totalMusics - a.totalMusics);
  },
});