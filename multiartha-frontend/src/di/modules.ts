import { AuthUseCase } from "@/application/use-cases/authUseCase";
import { ApiAuthRepository } from "../infrastructure/repositories/ApiAuthRepository";
import { ApiUserRepository } from "@/infrastructure/repositories/ApiUserRepository";
import { UserUseCase } from "@/application/use-cases/userUseCase";
import { ApiProductRepository } from "@/infrastructure/repositories/ApiProductRepository";
import { ProductUseCase } from "@/application/use-cases/productUseCase";

const authRepository = new ApiAuthRepository();
const authUseCase = new AuthUseCase(authRepository);

const userRepository = new ApiUserRepository();
const userUseCase = new UserUseCase(userRepository)

const productRepository = new ApiProductRepository();
const productUseCase = new ProductUseCase(productRepository);

export {
  authUseCase,
  userUseCase,
  productUseCase
};