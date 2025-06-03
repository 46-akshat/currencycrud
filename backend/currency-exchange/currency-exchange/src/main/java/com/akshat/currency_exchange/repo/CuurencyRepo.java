package com.akshat.currency_exchange.repo;

import com.akshat.currency_exchange.model.CurrencyRate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.*;

@Repository
public class CuurencyRepo {
    private final Map<Long, CurrencyRate> store =new HashMap<>();
    private long currid=0;

    public List<CurrencyRate> findall(){
        return new ArrayList<>(store.values());
    }


}
