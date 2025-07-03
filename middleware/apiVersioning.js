export const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      message: "API Version is not supported",
    });
  }
};

//lets say u also wanna check some header versioning
export const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

export const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");

  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version}+json`)
  ) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};
