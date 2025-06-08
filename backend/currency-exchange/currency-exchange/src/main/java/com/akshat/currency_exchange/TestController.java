package com.akshat.currency_exchange;
import com.akshat.currency_exchange.model.CurrencyRate;
import com.akshat.currency_exchange.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/test")
public class TestController {
    @PostMapping
    public String test(@RequestBody CurrencyRate rate) {
        return "Received -> " + rate;
    }
}
