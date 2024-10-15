import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Button, ContentForm, Form, FormSubmit, Icons, Separator } from "@hodler/ui";
import { KeyRound, Mail } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type LoginSchema = z.infer<typeof loginSchema>;

type Loading = {
  email?: boolean;
  google?: boolean;
};

export default function Login() {
  const [loading, setLoading] = useState<Loading>({
    email: false,
    google: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    setLoading({ ...loading, email: true });
    // Lógica de login para email e senha
  };

  const handleGoogleSignIn = () => {
    setLoading({ ...loading, google: true });
    // Lógica de login com Google
    console.log("Login com Google");
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-[url('/Cryptouse.png')] bg-cover bg-no-repeat bg-center p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0" />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mx-auto mt-24 md:mt-0">
              <img src="/hodle.png" alt="hodle logo" width={100} height={100} />
            </div>
            <p className="mt-3 font-bold text-xl">
              Crie uma conta <br /> para o seu comércio
            </p>
            <p className="text-gray-500 mt-4">
              Não tem uma conta ainda?{" "}
              <Link to="/register" className="text-gray-950 font-bold">
                Registre-se
              </Link>
            </p>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <ContentForm.Field
                name="email"
                className="relative w-full flex items-center"
              >
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                <ContentForm.InputField
                  {...register("email")}
                  placeholder="Email"
                  className="pl-10"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </ContentForm.Field>
            </div>
            <div className="grid gap-2">
              <ContentForm.Field
                name="password"
                className="relative w-full flex items-center"
              >
                <KeyRound className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                <ContentForm.InputField
                  {...register("password")}
                  type="password"
                  placeholder="Senha"
                  className="pl-10"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </ContentForm.Field>
            </div>

            <FormSubmit asChild>
              <Button
                disabled={loading.email}
                type="submit"
                className="bg-gray-800 w-full hover:bg-gray-900 transition-all"
              >
                {loading.email ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Entrar
              </Button>
            </FormSubmit>
            <div className="flex items-center justify-center mt-4">
              <Separator />
              <span
                color="gray"
                className=" inline bg-background px-2 text-muted-foreground"
              >
                OU CONTINUE COM
              </span>
              <Separator />
            </div>

            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                disabled={loading.google}
                onClick={handleGoogleSignIn}
                className="max-w-[240px] flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 hover:bg-gray-50 w-full md:max-w-none"
              >
                {loading.google ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.google className="mr-2 h-4 w-4" />
                )}
                <span className="mx-2">Login com o Google</span>
              </Button>
            </div>
          </Form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao utilizar nossa plataforma, você concorda com os nossos{" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de uso
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
