import jwt from "jsonwebtoken";
export function checkMethod(handler, methods = ["GET"]) {
  return async (req, res) => {
    const authorization = req.headers["authorization"];
    const token = authorization ? authorization.split(" ") : undefined;

    // try {
    //   token[1]&jwt.verify(token[1], "itsKey");
    // } catch (err) {
    //   res.status(401).json(err);
    //   return;
    // }

    if (methods.includes(req.method)) await handler(req, res);
    else res.status(405).json("Method Not Allowed");
  };
}
