package PointOfSales.ProjectPOS.Utils;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Username tidak boleh kosong")
    @Size(min = 4, message = "Username terlalu pendek (minimal 4 karakter)")
    private String username;

    @NotBlank(message = "Password tidak boleh kosong")
    @Size(min = 4, message = "Password terlalu pendek (minimal 4 karakter)")
    private String password;
}