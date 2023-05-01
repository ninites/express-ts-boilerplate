import express from 'express';

const ROUTE = '/test';

class TestApi {
  private readonly _app: express.Application;
  constructor(app: express.Application) {
    this._app = app;
    this.routes();
  }

  routes() {
    this._app.get(`${ROUTE}/`, async (req, res) => {
      try {
        console.log('TEST API | TEST START');
        const result = { success: true, message: 'TEST API | TEST START' };
        res.send(result);
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    });
  }
}

export { TestApi };
