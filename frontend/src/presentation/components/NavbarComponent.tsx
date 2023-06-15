import { Navbar, Button, Link, Text, Image, Modal, Input, Row } from "@nextui-org/react";
import partsbadger from '../../assets/partsbadger.png'
import { useState } from "react";
import { Password } from "./Password";
import { Mail } from "./Mail";
import { useForm } from "react-hook-form";
import { LoginInformation } from "../../domain/interfaces/LoginInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../domain/validators/UserSchema";
import inventoryApi from "../../services/api/inventoryApi";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent() {

  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(false)
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<LoginInformation>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema)
})


const onSubmit = async(userInformation: LoginInformation) => {
  try {
    if(!login){
     const response = await inventoryApi.post('api/login/',userInformation);
      console.log(response.data,'data');
      localStorage.setItem('token',response.data.access);
      closeHandler();
      navigate("/dashboard-material");

      return;
    }
    const userRegister = {...userInformation, email: userInformation.username}
    const response = await inventoryApi.post('api/register/',userRegister)
    console.log(response)
    setLogin(false)
  } catch (error) {
      console.log(error)
      reset()
     
      
  }
}

    return (
      <>
    <Navbar css={{width:'100%'}} isBordered variant={'static'}>
        <Navbar.Brand>
          <Image src={partsbadger} style={{width:'80px'}} ></Image>
        </Navbar.Brand>
        <Navbar.Content activeColor="error" variant="underline" hideIn="xs">
          <Navbar.Link isActive href="#">Features</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button onPress={handler} color="error" auto flat as={Link} href="#">
              Start
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to 
            <Text b size={18}>
               PartsBadger Inventory
            </Text>
          </Text>

          <Text> {!login ? "First Time," : "I have an account"  }  <Link color="success" onPress={() => setLogin(!login)}> {!login ? " create your account" : "Login"  }   </Link> </Text>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <Input
            clearable
            bordered
            fullWidth
            color="success"
            helperText={errors.username && errors.username.message }
            size="lg"
            status={errors.username ? 'error' : 'success'}
            {...register('username')}
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
          />

          <Input.Password
            clearable
            bordered
            helperText={errors.password && errors.password.message }
            fullWidth
            color="success"
            size="lg"
            status={errors.password ? 'error' : 'success'}
            {...register('password')}
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
              <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button type='submit' isLoading={isSubmitting} disabled={!isDirty || !isValid} color='success' auto >
          {!login ? "Sign in" : "Create account"  }
          
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      </>
    
    )
}