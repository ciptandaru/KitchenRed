const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const PubController = require("../controllers/pubController");
const {
  authentication,
  authorization,
  authorizationCategoryAndStatus,
  authenticationCustomer
} = require("../middleware/authentication");
const errorHandling = require("../middleware/errorHandler");

// login & register
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/glogin", Controller.gLogin);

// CRD cuisine
router.post("/cuisines", authentication, Controller.createCuisines);
router.get("/cuisines", authentication, Controller.readCuisines);
router.get("/cuisines/:id", authentication, Controller.readCuisinesDetail);
router.put("/cuisines/:id", authentication, Controller.editCuisines);
router.patch(
  "/cuisines/:id",
  authentication,
  authorizationCategoryAndStatus,
  Controller.patchCuisines
);
router.delete(
  "/cuisines/:id",
  authentication,
  authorization,
  Controller.deleteCuisines
);

router.get("/histories", authentication, Controller.readHistories);

router.get("/dashboard", authentication, Controller.readDashboard);

router.get("/categories", authentication, Controller.readCategories);
router.post("/categories", authentication, Controller.createCategory);
router.delete(
  "/categories/:id",
  authentication,
  authorizationCategoryAndStatus,
  Controller.deleteCategory
);



//======================================Publish================================
// Login
router.post("/pub/register", PubController.registerCus);
router.post("/pub/login", PubController.loginCus);
router.post("/pub/glogin", PubController.gLoginCus);
// Entitas Utama
router.get("/pub/cuisines", PubController.readCuisinesCus);
router.get("/pub/cuisines/:id", PubController.readCuisinesDetailCus);
router.get("/pub/favorites", authenticationCustomer, PubController.readFavorite);
router.post("/pub/favorites", authenticationCustomer, PubController.createFavorite);
router.use(errorHandling);
module.exports = router;
