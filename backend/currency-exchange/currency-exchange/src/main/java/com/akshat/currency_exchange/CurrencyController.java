package com.akshat.currency_exchange;

import com.akshat.currency_exchange.model.CurrencyRate;
import com.akshat.currency_exchange.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/currency")
public class CurrencyController {
@Autowired
    private CurrencyService service;
@GetMapping("all")
public List<CurrencyRate> getAll(){
    return service.getAllPairs();
}
@GetMapping("/{id}")
public CurrencyRate getByid(@PathVariable Long id){
    return service.getById(id);
}


@PostMapping("add")
    public CurrencyRate add(@RequestBody CurrencyRate rate){
    return service.add(rate);
}
@PutMapping("add")
public CurrencyRate updateCurrency(@RequestBody CurrencyRate rate){
     return service.updateCurrency(rate);
}
@DeleteMapping("/{id}")

public String deleteCurrency(@PathVariable Long id){
    return service.deleteidbycurrency(id);
}


}
