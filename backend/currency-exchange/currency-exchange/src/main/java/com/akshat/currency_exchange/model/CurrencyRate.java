package com.akshat.currency_exchange.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CurrencyRate {
    private Long id;
    private String basecurrency;
    private String targetcurrency;
    private Double rate;
}
