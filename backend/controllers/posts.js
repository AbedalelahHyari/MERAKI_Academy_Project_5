const connection = require("../database/db");

const createNewPost = (req, res) => {
  const { description, media } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (description,user_id,media) VALUES (?,?,?);`;
  const data = [description, user_id, media];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "Post created",
      results: results,
    });
  });
};
/****************************************/
const getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts WHERE is_deleted=0;`;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the posts",
      results: result,
    });
  });
};
/********************************** */

module.exports = {
  createNewPost,
  getAllPosts,
};