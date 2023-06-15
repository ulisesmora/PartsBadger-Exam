import { Container } from "@nextui-org/react";
import NavbarComponent from "../components/NavbarComponent";
import HomeContent from "../components/HomeContent";

export default function Home() {
    return (

        <Container css={{w:'100%',h:'100vh'}}>
            <NavbarComponent/>
            <HomeContent/>
        </Container>
    )
}
