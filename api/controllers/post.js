import { Posts } from "../models/Posts.js";
import { Users } from "../models/Users.js";
import jwt from "jsonwebtoken";
import { Comments } from "../models/Comments.js";
import { Heart } from "../models/Heart.js";
import { Op } from "sequelize";
import { CommentsResponse } from "../models/CommentsResponse.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Heart,
          as: "hearts",
          attributes: ["id", "heart"],
        },
      ],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json("No Hay Articulos");
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export const getPostByID = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Posts.findByPk(postId, {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "username", "image"],
        },
        {
          model: Comments,
          as: "comments",
          attributes: ["id", "comments", "updatedAt"],
          include: [
            {
              model: Users,
              as: "commenter",
              attributes: ["id", "username", "image"],
            },
            {
              model: CommentsResponse,
              as: "replies",
              attributes: ["id", "comments", "createdAt"],
              include: [
                {
                  model: Users,
                  as: "userComments",
                  attributes: ["id", "username", "image"],
                },
              ],
            },
          ],
        },
        {
          model: Heart,
          as: "hearts",
          attributes: ["id", "heart"],
          include: [
            {
              model: Users,
              as: "userHearts",
              attributes: ["id", "username", "image"],
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json("No Hay Articulos por ID");
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error interno del servidor");
  }
};
export const getPostByTitle = async (req, res) => {
  try {
    const postName = req.query.title.toLowerCase();

    if (!postName) {
      return res.status(400).json("No hay artículos");
    }

    const posts = await Posts.findAll({
      where: {
        title: {
          [Op.iLike]: `%${postName}%`,
        },
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "username", "image"],
        },
        {
          model: Comments,
          as: "comments",
          attributes: ["id", "comments", "updatedAt"],
          include: [
            {
              model: Users,
              as: "commenter",
              attributes: ["id", "username", "image"],
            },
            {
              model: CommentsResponse,
              as: "replies",
              attributes: ["id", "comments"],
              include: [
                {
                  model: Users,
                  as: "userComments",
                  attributes: ["id", "username", "image"],
                },
              ],
            },
          ],
        },
        {
          model: Heart,
          as: "hearts",
          attributes: ["id", "heart"],
          include: [
            {
              model: Users,
              as: "userHearts",
              attributes: ["id", "username", "image"],
            },
          ],
        },
      ],
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Hubo un error en el servidor");
  }
};

export const addPost = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("No estás autenticado para añadir post!");
    }

    const userInfo = jwt.verify(token, "jwtkey");

    const newPost = {
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      links: req.body.links,
      date: req.body.date,
      uid: userInfo.id,
    };

    const createdPost = await Posts.create(newPost);

    res.json("Post creado con éxito!");
  } catch (err) {
    res.status(500).json("Error interno del servidor del post");
  }
};

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("No estás autenticado para eliminar post!");
  }

  try {
    // Verifica el token una vez y usa la información del usuario
    const userInfo = jwt.verify(token, "jwtkey");
    const postId = req.params.id;

    // Busca el post con toda su información asociada
    const post = await Posts.findOne({
      where: {
        id: postId,
        uid: userInfo.id, // Solo permite eliminar si el post pertenece al usuario
      },
      include: [
        {
          model: Comments,
          as: "comments",
          attributes: ["id"],
          include: [
            {
              model: CommentsResponse,
              as: "replies",
              attributes: ["id"],
            },
          ],
        },
        {
          model: Heart,
          as: "hearts",
          attributes: ["id"],
        },
      ],
    });

    // Si no se encuentra el post o no pertenece al usuario
    if (!post) {
      return res
        .status(404)
        .json("No se encontró el post o no tienes permisos para eliminarlo");
    }

    await post.destroy();

    return res.json("Post eliminado con éxito!");
  } catch (err) {
    // Manejo más detallado de errores
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token no válido");
    }
    return res.status(500).json("Error en el servidor");
  }
};

export const updatePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("No estás autenticado para actualizar post!");
    }

    const userInfo = jwt.verify(token, "jwtkey");

    const postId = req.params.id;

    const updatedPost = {
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      links: req.body.links,
    };

    const [rowsUpdated] = await Posts.update(updatedPost, {
      where: {
        id: postId,
        uid: userInfo.id,
      },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json("No se encontró el post para actualizar");
    }

    res.json("Post actualizado con éxito!");
  } catch (err) {
    res.status(500).json("Error interno del servidor");
  }
};

//! comments \\

export const addComments = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await Posts.findByPk(postId);

    if (!post) {
      return res.status(404).json("Post no encontrado para comentar");
    }

    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("No estás autenticado para comentar!");
    }
    const userInfo = jwt.verify(token, "jwtkey");

    const comment = await Comments.create({
      comments: req.body.text,
      postId: postId,
      commenterId: userInfo.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor");
  }
};

export const deleteComments = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json(" paso 1 No estás autenticado para eliminar el comentario!");
    }
    const userInfo = jwt.verify(token, "jwtkey");
    const userAdmin = userInfo.admin;
    const commentId = req.params.id;

    const comment = await Comments.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return res.status(404).json(" paso 2Comentario no encontrado");
    }

    if (comment.commenterId !== userInfo.id && userAdmin !== true) {
      return res
        .status(403)
        .json(" paso 3 No tienes permisos para eliminar este comentario");
    } else {
      // Eliminar el comentario
      await Comments.destroy({
        where: {
          id: commentId,
        },
      });

      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor");
  }
};

//! respuesta del comentario \\
export const addResponseComment = async (req, res) => {
  try {
    const commentId = req.body.commentid;
    console.log(commentId);
    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json("Comentario no encontrado para Responder");
    }

    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("No estás autenticado para Responder!");
    }
    const userInfo = jwt.verify(token, "jwtkey");

    const response = await CommentsResponse.create({
      comments: req.body.text,
      parentCommentId: commentId,
      uidComents: userInfo.id,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor de la Respuesta");
  }
};

//! Eliminar respuesta \\
export const deleteResponse = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json(" paso 1 No estás autenticado para eliminar la Respuesta!");
    }
    const userInfo = jwt.verify(token, "jwtkey");
    const userAdmin = userInfo.admin;
    const repliestId = req.params.id;

    const replie = await CommentsResponse.findOne({
      where: {
        id: repliestId,
      },
    });

    if (!replie) {
      return res.status(404).json(" paso 2 respuesta no encontrada");
    }

    if (replie.uidComents !== userInfo.id && userAdmin !== true) {
      return res
        .status(403)
        .json(" paso 3 No tienes permisos para eliminar esta Respuesta");
    } else {
      // Eliminar respuesta
      await CommentsResponse.destroy({
        where: {
          id: repliestId,
        },
      });

      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor de Respuestas");
  }
};

//! likes \\
export const addHeart = async (req, res) => {
  try {
    const postId = req.body.postid;
    const post = await Posts.findByPk(postId);

    if (!post) {
      return res.status(404).json("Paso 1 like Post no encontrado");
    }

    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("No estás autenticado para dar like!");
    }
    const userInfo = jwt.verify(token, "jwtkey");

    const heart = await Heart.create({
      heart: req.body.heart,
      postHeartId: postId,
      userHeartId: userInfo.id,
    });

    res.status(201).json(heart);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor heart");
  }
};

export const deleteHeart = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json(" paso 1 No estás autenticado para eliminar heart!");
    }
    const userInfo = jwt.verify(token, "jwtkey");
    const heartId = req.params.id;

    console.log("!!!!! es " + heartId);

    const heart = await Heart.findOne({
      where: {
        id: heartId,
      },
    });

    if (!heart) {
      return res.status(404).json(" paso 2 heart no encontrado");
    }

    if (heart.userHeartId !== userInfo.id) {
      return res
        .status(403)
        .json(" paso 3 No tienes permisos para eliminar este comentario");
    } else {
      // Eliminar el comentario
      await Heart.destroy({
        where: {
          id: heartId,
        },
      });

      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error interno del servidor");
  }
};
