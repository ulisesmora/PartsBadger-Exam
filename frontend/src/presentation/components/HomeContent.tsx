import { Col, Container, Row, Text } from "@nextui-org/react";
import Lottie from "lottie-react";
import animation from "../../assets/68339-labs.json"

export default function HomeContent() {
    return (
        <Container style={{ width: '100%' }}>
            <Row>
            <Col css={{'display':'flex','justifyContent':'center','alignItems':'center', 'flexDirection':'column','alignContent':'center','height':'80vh'}}>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                >
                    Let's
                </Text>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $purple600 -20%, $pink600 100%",
                    }}
                    weight="bold"
                >
                    Make your 
                </Text>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $yellow600 -20%, $red600 100%",
                    }}
                    weight="bold"
                >
                    Inventory
                </Text>
            </Col>
            <Col>
            <Lottie animationData={animation} loop={true} />
            </Col>
            </Row>
        </Container>
    )
}
