package com.archeryonly.quiver;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PageController {
    @RequestMapping("/")
    public String index() {
        return "Hello, 世界!";
    }
}
