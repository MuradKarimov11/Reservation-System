package com.murad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoReservation {

    private Long userId;

    private String email;

    private Long roomId;

    private LocalDate startDate;

    private LocalDate endDate;
}
