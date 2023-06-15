import {
    Navbar,
    Image,
} from "@nextui-org/react";
import partsbadger from "../../assets/partsbadger.png";
import { useLocation } from "react-router-dom";
import CreateOptions from "./CreateOptions";

export default function NavbarInventory() {
    const navigation = useLocation();
    console.log(navigation)

    function PrintButton(pathname: string): string {
        if (pathname === "/dashboard/material") {
            return "material";
        }
        if (pathname === "/dashboard/inventory") {
            return "inventory";
        }
        if (pathname === "/dashboard/operation") {
            return "operation";
        }
        return "";
    }

    return (
        <Navbar css={{ width: "100%" }} isBordered variant={"static"}>
            <Navbar.Brand>
                <Image src={partsbadger} style={{ width: "80px" }}></Image>
            </Navbar.Brand>
            <Navbar.Content activeColor="error" variant="underline" hideIn="xs">
                <Navbar.Link
                    isActive={navigation.pathname === "/dashboard/material"}
                    href="/dashboard/material"
                >
                    Materials
                </Navbar.Link>
                <Navbar.Link
                    isActive={navigation.pathname === "/dashboard/inventory"}
                    href="/dashboard/inventory"
                >
                    Inventory
                </Navbar.Link>
                <Navbar.Link
                    isActive={navigation.pathname === "/dashboard/operation"}
                    href="/dashboard/operation"
                >
                    Operations
                </Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                  <CreateOptions name={PrintButton(navigation.pathname)}/>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
}
