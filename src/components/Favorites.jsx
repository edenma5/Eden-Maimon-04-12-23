import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions } from "@mui/material";
import Button2 from "@mui/joy/Button";

import { useState } from "react";

const Favorites = ({ getFavorites, saveFavorites }) => {
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState(false);

  function alertPopUp() {
    setAlert(true);
  }

  const deleteHandle = (cityName) => {
    const newArr = getFavorites();
    const indexToRemove = newArr.findIndex((f) => f.cityName === cityName);
    newArr.splice(indexToRemove, 1);

    saveFavorites(newArr);
    setKey((k) => ++k);
    setAlert(false);
  };

  return (
    <>
      <section
        key={key}
        className=" bg-slate-50 py-10 px-8 my-10 mx-14 border-2"
      >
        <div className="mb-10">
          <h2 className="text-center capitalize font-bold text-lg">
            favorites
          </h2>
        </div>

        <div className="flex items-start flex-wrap justify-center gap-8 ">
          {getFavorites()?.map((favorite, i) => {
            return (
              <Card
                sx={{ width: 220, height: 350 }}
                key={i}
                className="flex flex-col items-center"
              >
                <CardMedia
                  sx={{ height: 120 }}
                  component="img"
                  height="20"
                  image="../../assets/images/day.avif"
                  alt="green iguana"
                />
                <CardContent className="flex flex-col justify-center items-center text-center">
                  <Typography gutterBottom variant="h6" component="div">
                    {favorite.cityName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {favorite.curWeather.WeatherText}
                  </Typography>
                </CardContent>
                <CardActions className="mt-auto">
                  <Button
                    size="md"
                    className="capitalize"
                    color="error"
                    onClick={() => alertPopUp()}
                  >
                    Delete
                  </Button>

                  {alert && (
                    <>
                      <div className="w-screen h-screen bg-black opacity-20 absolute left-0 top-0"></div>
                      <div className=" bg-slate-50 py-5 px-16 absolute flex flex-col justify-center top-2/3 left-1/2 -translate-y-2/4 -translate-x-2/4">
                        <p className="text-center p-2">{`are you sure delete?`}</p>

                        <div className=" flex gap-8 py-2 justify-center">
                          <Button2
                            color="success"
                            onClick={() => deleteHandle(favorite.cityName)}
                            size="md"
                            variant="soft"
                            className="capitalize"
                          >
                            yes
                          </Button2>
                          <Button2
                            color="danger"
                            onClick={() => setAlert(false)}
                            size="md"
                            variant="soft"
                            className="capitalize"
                          >
                            no
                          </Button2>
                        </div>
                      </div>
                    </>
                  )}
                </CardActions>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Favorites;
