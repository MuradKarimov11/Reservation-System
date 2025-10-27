package com.murad.services;

import com.murad.dto.ReservationSearchFilter;
import com.murad.status.ReservationStatus;
import com.murad.dto.DtoReservation;
import com.murad.dto.DtoReservationUI;
import com.murad.entity.Reservation;
import com.murad.repositories.ReservationRepositories;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepositories reservationRepositories;

    public DtoReservation getReservationById(Long id) {
        DtoReservation dtoReservation = new DtoReservation();

        Optional<Reservation> optional = reservationRepositories.findById(id);
        if (optional.isEmpty()) {
            throw new NoSuchElementException("Reservation not found with id " + id);
        }
        Reservation reservation = optional.get();
        BeanUtils.copyProperties(reservation, dtoReservation);
        return dtoReservation;
    }


    public List<DtoReservation> getAllReservations(
        ReservationSearchFilter filter
    ) {
        List<DtoReservation> dtoReservationList = new ArrayList<>();

        List<Reservation> reservationList = reservationRepositories.findAll();
        if(!reservationList.isEmpty()) {
            for(Reservation reservation: reservationList) {
                DtoReservation dtoReservation = new DtoReservation();
                BeanUtils.copyProperties(reservation, dtoReservation);

                dtoReservationList.add(dtoReservation);
            }
        }
        return dtoReservationList;
    }

    public DtoReservation createReservation(DtoReservationUI dto) {

        if(dto.getStatus() != null) {
            throw new IllegalArgumentException("Status should be empty");
        }
        if(!dto.getEndDate().isAfter(dto.getStartDate())) {
            throw new IllegalArgumentException("start date must be 1 day earlier than end date");
        }

        Reservation res = new Reservation();
        BeanUtils.copyProperties(dto, res);

        Reservation saved = reservationRepositories.save(res);

        DtoReservation result = new DtoReservation();
        BeanUtils.copyProperties(saved, result);

        return result;
    }

    private DtoReservation convertToDto(Reservation reservation) {
        DtoReservation dto = new DtoReservation();
        BeanUtils.copyProperties(reservation, dto);

        return dto;
    }

    public DtoReservation updateReservation(Long id, DtoReservationUI reservationDtoUI) {

        Reservation reservation = reservationRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        if(!reservationDtoUI.getEndDate().isAfter(reservationDtoUI.getStartDate())) {
            throw new IllegalArgumentException("start date must be 1 day earlier than end date");
        }

        BeanUtils.copyProperties(reservationDtoUI, reservation);
        reservationRepositories.save(reservation);

        return convertToDto(reservation);

    }

    public void deleteReservation(Long id) {
        Optional<Reservation> reservation = reservationRepositories.findById(id);
        if(reservation.isEmpty()) {
            throw new NoSuchElementException("Not found reservation by id " + id);
        }
        reservationRepositories.deleteById(id);
    }


    public DtoReservation approveReservation(Long id) {
        Optional<Reservation> reservation = reservationRepositories.findById(id);

        if(reservation.isEmpty()) {
            throw new NoSuchElementException("Not found reservation by id " + id);
        }

        if(reservation.get().getStatus() != ReservationStatus.PENDING) {
            throw new IllegalStateException("Cannot approve reservation: status=" + reservation);
        }

        return null;
    }
}
