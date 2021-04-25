const app=require(`${__dirname}/app`);

//server
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
