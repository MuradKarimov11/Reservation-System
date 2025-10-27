package com.murad.dto;
import com.murad.status.ReservationStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoReservationUI {

    @Null
    private Long id;

    @NotNull
    private Long userId;

    @Email(message = "Email formatinda daxil edin")
    private String email;

    @NotNull
    private Long roomId;

    @FutureOrPresent
    @NotNull
    private LocalDate startDate;

    @FutureOrPresent
    @NotNull
    private LocalDate endDate;

    private ReservationStatus status;
}
