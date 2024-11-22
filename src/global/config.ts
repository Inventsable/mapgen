export const CONFIG = {
  paths: {
    input: {
      position:
        "D:/SteamLibrary/steamapps/common/Crusader Kings III/game/map_data/positions.txt",
      terrain: {
        data: "D:/SteamLibrary/steamapps/common/Crusader Kings III/game/common/province_terrain/00_province_terrain.txt",
        properties:
          "D:/SteamLibrary/steamapps/common/Crusader Kings III/game/common/province_terrain/01_province_properties.txt",
      },
    },
    output: {
      terrain: {
        data: "./data/terrain/provinces.json",
        properties: "./data/terrain/properties.json",
      },
      position: "",
    },
  },
};
