"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
    ctx.service.index.insert();
  }

  async upload() {
    const { ctx } = this;
    console.log(ctx.request.files);
    ctx.body = ctx.request.files;
    ctx.status = 200;
  }
}

module.exports = HomeController;
