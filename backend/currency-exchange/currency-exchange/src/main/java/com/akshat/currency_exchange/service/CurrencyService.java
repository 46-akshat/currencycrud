package com.akshat.currency_exchange.service;

import com.akshat.currency_exchange.model.CurrencyRate;
import com.akshat.currency_exchange.repo.CuurencyRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {
    private CuurencyRepo repo = null;
      public CurrencyService(CuurencyRepo repo){
          this.repo=repo;
      }

    public List<CurrencyRate> getAllPairs() {
          return repo.findAll();
    }
}
