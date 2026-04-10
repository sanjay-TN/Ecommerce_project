package com.flipkartclone.ecommerce.config;

import com.flipkartclone.ecommerce.entity.*;
import com.flipkartclone.ecommerce.repository.CartRepository;
import com.flipkartclone.ecommerce.repository.CategoryRepository;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            AppUser admin = userRepository.save(AppUser.builder()
                    .fullName("Admin User")
                    .email("admin@flipkartclone.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ROLE_ADMIN)
                    .enabled(true)
                    .createdAt(LocalDateTime.now())
                    .build());
            AppUser customer = userRepository.save(AppUser.builder()
                    .fullName("Demo Customer")
                    .email("customer@flipkartclone.com")
                    .password(passwordEncoder.encode("Customer@123"))
                    .role(Role.ROLE_CUSTOMER)
                    .enabled(true)
                    .createdAt(LocalDateTime.now())
                    .build());
            cartRepository.saveAll(List.of(
                    Cart.builder().user(admin).build(),
                    Cart.builder().user(customer).build()
            ));
        }

        if (categoryRepository.count() == 0) {
            Category mobiles = categoryRepository.save(Category.builder().name("Mobiles").description("Smartphones and accessories").build());
            Category electronics = categoryRepository.save(Category.builder().name("Electronics").description("Audio, wearables and gadgets").build());
            Category fashion = categoryRepository.save(Category.builder().name("Fashion").description("Apparel and lifestyle").build());

            createProduct("Apple iPhone 15", "APL-IP15", mobiles, "Apple", "Flagship smartphone with A16 chipset",
                    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
                    new BigDecimal("72999"), new BigDecimal("79999"), 12, true, 4.6, 2800);
            createProduct("Samsung Galaxy Buds Pro", "SMS-BUDSPRO", electronics, "Samsung", "Premium ANC true wireless earbuds",
                    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
                    new BigDecimal("8999"), new BigDecimal("12999"), 30, true, 4.3, 910);
            createProduct("Men Casual Shirt", "FSH-SHIRT-01", fashion, "Roadster", "Comfort fit cotton casual shirt",
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
                    new BigDecimal("999"), new BigDecimal("1999"), 80, false, 4.1, 150);
        }
    }

    private void createProduct(String name, String sku, Category category, String brand, String description,
                               String image, BigDecimal price, BigDecimal originalPrice, int stock,
                               boolean featured, double avgRating, int totalRatings) {
        Product product = Product.builder()
                .name(name)
                .sku(sku)
                .category(category)
                .brand(brand)
                .description(description)
                .thumbnail(image)
                .price(price)
                .originalPrice(originalPrice)
                .stock(stock)
                .featured(featured)
                .averageRating(avgRating)
                .totalRatings(totalRatings)
                .createdAt(LocalDateTime.now())
                .build();
        product.getImages().add(ProductImage.builder().product(product).imageUrl(image).build());
        productRepository.save(product);
    }
}
