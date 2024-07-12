import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  musics: defineTable({
    user: v.id("users"),
    musicTitle: v.string(),
    musicDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    // voicePrompt: v.string(),
    imagePrompt: v.string(),
    // voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_title", { searchField: "musicTitle" })
    .searchIndex("search_body", { searchField: "musicDescription" }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});

// export default defineSchema({
//   tasks: defineTable({
//     text: s.string(),
//     isCompleted: s.boolean(),
//   }),
// });
