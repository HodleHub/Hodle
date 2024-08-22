import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Skeleton,
  TextField,
  Text,
  Heading,
} from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useFormik } from 'formik';
import { useCustomMutation } from '@hodler/relay';
import * as Yup from 'yup';
import { UserRegisterMutation } from "./mutation/__generated__/UserRegisterMutation.graphql";
import { UserRegister } from "./mutation/UserRegister";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(true);
  const loadingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const [userRegisterMutation] = useCustomMutation<UserRegisterMutation>({
    name: 'userRegister',
    mutation: UserRegister,
  });

  const onSubmit = async (values: FormValues) => {
      userRegisterMutation({
        username: values.name,
        email: values.email,
        password: values.password,
      })
  } 

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container className="h-screen flex items-center justify-center" size="1">
      <Card asChild variant="classic" size="4">
        <form onSubmit={formik.handleSubmit}>
          <Box height="40px" mb="4">
            <Heading as="h3" size="6" mt="-1">
              <Skeleton loading={isLoading}>Sign up</Skeleton>
            </Heading>
          </Box>

          <Box mb="3">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
                <Skeleton loading={isLoading}>Your name</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="name"
                  name="name"
                  type="text"
                  variant="classic"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </Skeleton>
              {formik.touched.name && formik.errors.name ? (
                <Text color="red" size="1">{formik.errors.name}</Text>
              ) : null}
            </Flex>
          </Box>

          <Box mb="3">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
                <Skeleton loading={isLoading}>Email address</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="email"
                  name="email"
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </Skeleton>
              {formik.touched.email && formik.errors.email ? (
                <Text color="red" size="1">{formik.errors.email}</Text>
              ) : null}
            </Flex>
          </Box>

          <Box mb="3" position="relative">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="password">
                <Skeleton loading={isLoading}>Password</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="password"
                  name="password"
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Skeleton>
              {formik.touched.password && formik.errors.password ? (
                <Text color="red" size="1">{formik.errors.password}</Text>
              ) : null}
            </Flex>
          </Box>

          <Box mb="3">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="confirmPassword">
                <Skeleton loading={isLoading}>Confirm your password</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="classic"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
              </Skeleton>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <Text color="red" size="1">{formik.errors.confirmPassword}</Text>
              ) : null}
            </Flex>
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Skeleton loading={isLoading}>
              <Button variant="solid" type="submit">
                Sign up
              </Button>
            </Skeleton>
          </Flex>
        </form>
      </Card>
    </Container>
  );
}