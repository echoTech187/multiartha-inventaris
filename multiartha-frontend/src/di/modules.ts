import { AuthUseCase } from "@/application/use-cases/authUseCase";
import { ApiAuthRepository }  from "../infrastructure/repositories/ApiAuthRepository";

const authRepository = new ApiAuthRepository();
const authUseCase = new AuthUseCase(authRepository);

export {
  authUseCase,
};