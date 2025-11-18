import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addProblemToPlaylist, createPlayList, deletePlayList, getPlayListDetails,removeProblemFromPlaylist } from '../controllers/playlist.controller.js';

const playlistRoutes = express.Router()

playlistRoutes.get("/",authMiddleware,getPlayListDetails)

playlistRoutes.get("/:playlistId",authMiddleware,getPlayListDetails)

playlistRoutes.get("/create-playlist",authMiddleware,createPlayList)

playlistRoutes.get("/:playlistId/addProblem",authMiddleware,addProblemToPlaylist);

playlistRoutes.delete("/:playlistId",authMiddleware,deletePlayList)

playlistRoutes.delete("/playlistId/remove-problem",authMiddleware,removeProblemFromPlaylist)


export default playlistRoutes;