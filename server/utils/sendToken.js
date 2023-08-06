export const sendToken = (user, statusCode, message, res) => {
  const token = user.genToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };

  return res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
  });
};
