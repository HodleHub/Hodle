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
  Link,
} from "@radix-ui/themes";
import React, { useEffect } from "react";

export default function Login() {
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

  return (
    <Container className="h-screen flex items-center justify-center" size="1">
      <Card asChild variant="classic" size="4">
        <form action="/">
          <Box height="40px" mb="4">
            <Heading as="h3" size="6" mt="-1">
              <Skeleton loading={isLoading}>Sign up</Skeleton>
            </Heading>
          </Box>

          <Box mb="5">
            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="email">
                <Skeleton loading={isLoading}>Email address</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="email"
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                />
              </Skeleton>
            </Flex>
          </Box>

          <Box mb="5" position="relative">
            <Box position="absolute" top="0" right="0" style={{ marginTop: -2 }}>
              <Link href="#" size="2">
                <Skeleton loading={isLoading}>Forgot password?</Skeleton>
              </Link>
            </Box>

            <Flex direction="column">
              <Text as="label" size="2" weight="medium" mb="2" htmlFor="password">
                <Skeleton loading={isLoading}>Password</Skeleton>
              </Text>
              <Skeleton loading={isLoading}>
                <TextField.Root
                  id="password"
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                />
              </Skeleton>
            </Flex>
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Skeleton loading={isLoading}>
              <Button variant="surface" highContrast color="gray">
                <Link href="/register">Create an account</Link>
              </Button>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Button variant="solid" type="submit">
                Sign in
              </Button>
            </Skeleton>
          </Flex>
        </form>
      </Card>
    </Container>
  );
}
