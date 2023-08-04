import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const HeaderImage = () => {
  return (
    <Box color="white" sx={{ position: 'relative', backgroundColor: "white" }}>
      <CardMedia
        component="img"
        height="640"
        image="/img/Header.jpg" />
      {/* ... */}
    </Box>
  );
};

export default HeaderImage;
