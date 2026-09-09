export const getUserData = async (req, res) => {
  try {
    const { role, recentSearchCities } = req.user;

    return res.json({
      success: true,
      role,
      recentSearchCities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Store the latest three cities searched by the authenticated user.
export const storeRecentSearchCities = async (req, res) => {
  try {
    const city = String(
      req.body.recentSearchCity ?? req.body.recentSearchCities ?? "",
    ).trim();

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "Recent search city is required",
      });
    }

    const recentCities = Array.isArray(req.user.recentSearchCities)
      ? req.user.recentSearchCities.filter(Boolean)
      : [];

    recentCities.push(city);
    req.user.recentSearchCities = recentCities.slice(-3);

    await req.user.save();

    return res.json({
      success: true,
      message: "CITY ADDED",
      recentSearchCities: req.user.recentSearchCities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
