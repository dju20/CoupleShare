package dju20.coupleshare;

import javax.management.StringValueExp;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
public class RedisTemplateTest {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void redisTemplateTest() {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        valueOperations.set("key1", "value1");
        String value = (String) valueOperations.get("key1");
        Assertions.assertThat(value).isEqualTo("value1");
    }
}
