package com.archeryonly.quiver.lanes;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lanes")
public class LaneController {
    private final LaneRepository repository;

    @Autowired
    public LaneController(final LaneRepository repository) {
        this.repository = repository;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lane> list() {
        return repository.findAll();
    }
}
