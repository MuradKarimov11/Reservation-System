package com.murad.controllers;

import com.murad.dto.DtoReservation;
import com.murad.dto.DtoReservationUI;
import com.murad.dto.ReservationSearchFilter;
import com.murad.services.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/rest/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/list/{id}")
    public ResponseEntity<DtoReservation> getReservationById(@PathVariable("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                    .body(reservationService.getReservationById(id));

    }

    @GetMapping("/list")
    public ResponseEntity<List<DtoReservation>> getAllReservations(
            @RequestParam("roomId") Long roomId,
            @RequestParam("userId") Long userId,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam("pageNumber") Integer pageNumber
    ) {
        var filter = new ReservationSearchFilter(
                roomId,
                userId,
                pageSize,
                pageNumber
        );
        List<DtoReservation> reservations = reservationService.getAllReservations(filter);
        return ResponseEntity.ok(reservations);
    }

    @PostMapping("/create")
    public ResponseEntity<DtoReservation> createReservation(@Valid @RequestBody DtoReservationUI dtoReservationUI) {
        DtoReservation savedDto = reservationService.createReservation(dtoReservationUI);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedDto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DtoReservation> updateReservation(@PathVariable("id") Long id, @Valid @RequestBody DtoReservationUI reservationDtoUI) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(reservationService.updateReservation(id, reservationDtoUI));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable("id") Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<DtoReservation> approveReservation(@PathVariable("id") Long id) {
        var reservation = reservationService.approveReservation(id);
        return ResponseEntity.ok(reservation);
    }
}
