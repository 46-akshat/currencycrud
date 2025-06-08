package com.akshat.currency_exchange.service;

import com.akshat.currency_exchange.model.CurrencyRate;
import com.akshat.currency_exchange.repo.CurrencyRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {

    private final CurrencyRepo repo;

    public CurrencyService(CurrencyRepo repo) {
        this.repo = repo;
    }

    public List<CurrencyRate> getAllPairs() {
        return repo.findAll();
    }

    public CurrencyRate getById(long id) {
        return repo.findById(id).orElse(null);
    }

    public CurrencyRate add(CurrencyRate rate) {
        return repo.save(rate);
    }

    public CurrencyRate updateCurrency(CurrencyRate rate) {
        return repo.save(rate);
    }

    public String deleteCurrencyById(Long id) {
        repo.deleteById(id);
        return "Currency pair with ID " + id + " deleted successfully.";
    }
}
