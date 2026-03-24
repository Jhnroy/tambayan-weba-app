import { register } from "@/services/auth-service";
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["register-account"],
        mutationFn: register,
    })
}