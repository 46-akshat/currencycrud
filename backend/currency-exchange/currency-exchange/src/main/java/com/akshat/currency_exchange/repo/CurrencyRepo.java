package com.akshat.currency_exchange.repo;

import com.akshat.currency_exchange.model.CurrencyRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepo extends JpaRepository<CurrencyRate, Long> {
}