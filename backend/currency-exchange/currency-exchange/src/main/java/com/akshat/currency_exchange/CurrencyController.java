
package com.akshat.currency_exchange;

import com.akshat.currency_exchange.model.CurrencyRate;
import com.akshat.currency_exchange.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/currency")
@CrossOrigin(origins = "http://localhost:5173")
public class CurrencyController {

    @Autowired
    private CurrencyService service;

    @GetMapping("/all")
    public List<CurrencyRate> getAll() {
        return service.getAllPairs();
    }

    @GetMapping("/{id}")
    public CurrencyRate getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping("")
    public CurrencyRate add(@RequestBody CurrencyRate rate) {
        System.out.println("Received: " + rate); // Debugging line
        return service.add(rate);
    }

    @PutMapping("")
    public CurrencyRate update(@RequestBody CurrencyRate rate) {
        return service.updateCurrency(rate);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return service.deleteCurrencyById(id);
    }
}
