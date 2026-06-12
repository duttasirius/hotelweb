export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchCities = req.user.recentSearchCities;

    res.json({
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

// store recent search cities from user
export const storeRecentSearchCities = async (req, res) => {
  try {
    const { recentSearchCities } = req.body;

    const user = await req.user;

    if (user.recentSearchCities.length < 3) {
      user.recentSearchCities.push(recentSearchCities);
    } else {
      // if user have more than 3 cities search Remove oldest city (first item)
      user.recentSearchCities.shift();

      // Add newest city to the end
      user.recentSearchCities.push(recentSearchCities);
    }

    await user.save();

    res.json({
      success: true,
      message: "CITY ADDED",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
