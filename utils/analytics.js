const isDev = process.env.NODE_ENV === "development";

export const sendAnalytics = (name) => {
  if (isDev) {
    console.log("analytics:", name);
    return;
  }

  try {
    window.ym(64332478, "reachGoal", name);
  } catch (error) {
    console.error(error);
  }
};
