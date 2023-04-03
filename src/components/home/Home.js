import { Box, Container } from "@mui/material";
import FeaturedProduct from "./FeaturedProduct";
import InfoSlider from "./InfoSlider";
import LatestProducts from "./LatestProducts";
import OffersList from "./OffersList";
import UniqueFeatures from "./UniqueFeatures";
import TrendingProducts from "./TrendingProducts";

export default function Home() {
    return (
        <>
            <InfoSlider />
            <Container maxWidth='md' disableGutters >
                <FeaturedProduct />
                <LatestProducts />
                <OffersList />
            </Container>
            <Box mt={5} display="flex" justifyContent='center' sx={{ 'backgroundColor': 'var(--light-purple)' }}>
                <UniqueFeatures />
            </Box>
            <Container maxWidth='md' disableGutters >
                <TrendingProducts />
            </Container>
        </>
    )
}
