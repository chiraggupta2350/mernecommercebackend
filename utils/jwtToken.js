// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };
    res.cookie('token', token, options);

    res.status(200).send({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;