const { validationResult } = require("express-validator");
const User = require("../../models/User");
const VideoPost = require("../../models/VideoPost");
const cloudinary = require("../../utils/cloudinary");
// const fs = require('fs');

// async function getVideoBuffer(req, res) {
//   const CHUNK_SIZE = 10 ** 6
//   try {
//     const range = req.headers["content-range"]
//     await console.log("REJNDZ", range);
//     if (!range) {
//       res.status(400).json({ msg: "Requires range header" })
//     }
//     const post = await VideoPost.findById(req.params.id);
//     if (!post) return res.status(404).json({ msg: "Post not found" });
//     const lastPart = await post.url.split("/")[post.url.split("/").length - 1]
//     const publicId = await lastPart.split(".")[0]
//     const newRes = await cloudinary.api.resource(publicId, { resource_type: "video" })
//     const videoSize = await newRes.bytes
//     const videoPath = await newRes.url
//     const start = Number(range.split("/")[0].replace(/\D/g, ""))
//     await console.log("START", start);
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
//     const contentLength = end - start + 1
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/*"
//     }
//     await res.writeHead(206, headers)
//     const videoStream = fs.createReadStream(newRes.url, { start, end })
//     await videoStream.pipe(res)
//     return res.json({ start, end, videoSize })
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId")
//     return res.status(404).json({ msg: "Post not found" });
//     res.status(500).send("Internal server error.");
//   }
// }

async function addView(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id)
    post.views += 1
    await post.save()
    res.json(post.views)
  } catch (e) {
    console.warn(e.message);
  }
}
async function uploadVideo(req, res) {
  try {
    const fileStr = await req.body.data;
    const user = await User.findById(req.user.id).select("username");
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "video",
    });
    const newPost = new VideoPost({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      by: user.username,
      url: uploadResponse.url, // || secure_url
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      isVideo: true,
      meta: req.body.meta,
      category: req.body.category,
      savedBy: [],
      views: 0
    });
    const post = await newPost.save();
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getAllVideos(req, res) {
  try {
    const posts = await VideoPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getVideoById(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
    return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function deleteVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    await post.remove();
    res.json({ msg: "Post removed." });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
// no update
async function saveVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id)
    if (await post.savedBy.filter(sb => sb.user.toString() === req.user.id.toString()).length > 0) post.savedBy = await post.savedBy.filter(sb => sb.user.toString() !== req.user.id.toString())
    else post.savedBy.push({ user: req.user.id })
    await post.save()
    res.json(post)
  } catch (e) {
    if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Internal server error.')
  }
}
async function commentVideo(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await VideoPost.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.username,
      user: req.user.id,
      endorsements: [],
      judgements: [],
      impulsions: [],
      replies: []
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getVideoComments(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    return res.json(post.comments);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}
async function updateComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const { content } = req.body;
    if (comment.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "User not authorised." });
    const newComment = {
      ...comment.toObject(),
      user: comment.user,
      text: content,
      name: comment.name,
      replies: comment.replies,
    };
    const index = post.comments
    .map((comm) => comm.id)
    .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
    comm.id === req.params.comment_id ? newComment : comm
  );
  await post.save();
  return res.json(post.comments[index]);
} catch (e) {
  console.error(e.message);
  res.status(500).send("Internal server error.");
}
}
async function deleteComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    if (comment.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function dismissVideo(req, res) {
  try {
    const user = await User.findById(req.user.id)
    const { dismissedPosts } = req.body
    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { dismissedPosts: [...dismissedPosts, req.params.id] },
      { new: true }
    )
    return res.json(newUser)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function replyToComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username,
      endorsements: [],
      judgements: [],
      impulsions: []
    };
    const newComment = {
      ...comment.toObject(),
      replies: [...comment.replies, newReply],
    };
    const index = post.comments
    .map((comm) => comm.id)
    .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
    comm.id === req.params.comment_id ? newComment : comm
  );
  await post.save();
  res.json(post.comments[index]);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}
async function updateReply(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const reply = await comment.replies.find(
      (rep) => rep.id === req.params.reply_id
    );
    const newReply = {
      ...reply.toObject(),
      user: req.user.id,
      content: req.body.content,
      by: user.username,
    };
    comment.replies = comment.replies.map((rep) =>
    rep.id === req.params.reply_id ? newReply : rep
  );
  await post.save();
  res.json(comment);
} catch (e) {
  res.status(500).send("Internal server error.");
}
}
async function getRepliesToComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    return res.json(post.comments.replies);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}
async function deleteReply(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const reply = comment.replies.find((rep) => rep.id === req.params.reply_id);
    if (!reply) return res.status(404).json({ msg: "Reply not found." });
    if (reply.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = comment.replies
    .map((rep) => rep.user.toString())
    .indexOf(req.user.id);
    comment.replies = comment.replies.filter(
      (rep) => rep.id !== req.params.reply_id
    );
    await post.save();
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getMyVideos(req, res) {
  try {
    const posts = await VideoPost.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function getUsersVideos(req, res) {
  try {
    const posts = await VideoPost.find({ user: req.params.id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function seeAllWhoImpulsed(req, res) {
  try {
    let users = [];
    const video = await VideoPost.findById(req.params.id);
    if (video) {
      for await (const person of video.impulsions) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoLiked(req, res) {
  try {
    let users = [];
    const video = await VideoPost.findById(req.params.id);
    if (video) {
      for await (const person of video.endorsements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoDisliked(req, res) {
  try {
    let users = [];
    const video = await VideoPost.findById(req.params.id);
    if (video) {
      for await (const person of video.judgements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function impulseVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.impulsions.unshift({ user: req.body.likerId });
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function likeVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.endorsements.unshift({ user: req.body.likerId });
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function dislikeVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.judgements.unshift({ user: req.body.likerId });
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function impulsifyComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id)
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    if (
      comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.impulsions.unshift({ user: req.body.likerId })
    if (
      comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      comment.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.endorsements.splice(
        comment.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function likeComment(req, res) {
try {
  const post = await VideoPost.findById(req.params.id);
  const comment = await post.comments.find(c => c.id === req.params.commentId)
  if (
    comment.endorsements.filter(
      (end) => end.user.toString() === req.body.likerId
    ).length > 0
  ) {
    comment.endorsements.splice(
      comment.endorsements
        .map((end) => end.user.toString())
        .indexOf(req.body.likerId),
      1
    );
    await post.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  }
  comment.endorsements.unshift({ user: req.body.likerId });
  if (
    comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
      .length > 0
  ) {
    comment.judgements.splice(
      comment.judgements
        .map((jud) => jud.user.toString())
        .indexOf(req.body.likerId),
      1
    );
  }
  if (
    comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
      .length > 0
  ) {
    // Get remove index
    comment.impulsions.splice(
      comment.impulsions
        .map((imp) => imp.user.toString())
        .indexOf(req.body.likerId),
      1
    );
  }
  await post.save();
  return res.json({
    impulsions: comment.impulsions,
    endorsements: comment.endorsements,
    judgements: comment.judgements,
  });
} catch (e) {
  console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function dislikeComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    if (
      comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.judgements.unshift({ user: req.body.likerId });
    if (
      comment.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.endorsements.splice(
        comment.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function impulsifyReplyToComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id)
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.impulsions.unshift({ user: req.body.likerId })
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function likeReplyToComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.endorsements.unshift({ user: req.body.likerId });
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
      if (e.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found" });
      res.status(500).send("Internal server error.");
    }
}
async function dislikeReplyToComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.judgements.unshift({ user: req.body.likerId });
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

const video = {
  // getVideoBuffer,
  addView,
  uploadVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  saveVideo,
  commentVideo,
  getVideoComments,
  updateComment,
  deleteComment,
  dismissVideo,
  replyToComment,
  updateReply,
  getRepliesToComment,
  deleteReply,
  getMyVideos,
  getUsersVideos,
  seeAllWhoImpulsed,
  seeAllWhoLiked,
  seeAllWhoDisliked,
  impulseVideo,
  likeVideo,
  dislikeVideo,
  impulsifyComment,
  likeComment,
  dislikeComment,
  impulsifyReplyToComment,
  likeReplyToComment,
  dislikeReplyToComment
};

module.exports = video;
