export const bodies = {
  moon: {
    pos: [0, 0, -7.5],
    scale: {
      active: [0.405, 0.405, 0.405],
      inActive: [0.27, 0.27, 0.27],
    },
    color: {
      active: "hotpink",
      inActive: "lightgrey",
    },
    field: {
      gRad: true,
      gField: true,
    },
    name: "moon",
  },
  marker: {
    pos: [0, 0, 7.5],
    scale: {
      active: [1, 1, 1],
      inActive: [1, 1, 1],
    },
    color: {
      active: "hotpink",
      inActive: "red",
    },
    field: {
      gRad: false,
      gField: false,
    },
    name: "marker",
  },
  earth: {
    pos: [0, 0, 0],
    scale: {
      active: [1.5, 1.5, 1.5],
      inActive: [1, 1, 1],
    },
    color: {
      active: "hotpink",
      inActive: "skyblue",
    },
    field: {
      gRad: true,
      gField: true,
    },
    name: "earth",
  },
  sun: {
    pos: [700, 0, 0],
    scale: {
      active: [1.5, 1.5, 1.5],
      inActive: [8, 8, 8],
    },
    color: {
      active: "lemonchiffon",
      inActive: "lemonchiffon",
    },
    field: {
      gRad: false,
      gField: false,
    },
    name: "sun",
  },
};
