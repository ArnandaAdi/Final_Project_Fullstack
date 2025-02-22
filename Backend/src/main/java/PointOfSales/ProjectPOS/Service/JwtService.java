package PointOfSales.ProjectPOS.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final  String SecretKey = "213d2a2b3c313328492a556e75387d246928372a5b35775248307b713577772a";

    public String extractUsername(String token) {
        return  extractClaim(token, Claims ::getSubject);
    }

    public  <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final  Claims claims = extractedAllClaims(token);
        return  claimsResolver.apply(claims);
    }

    public String generateToken (UserDetails userDetails){
        return  generateToken(new HashMap<>(), userDetails);
    }

    public  String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return  Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public  boolean isTokenValid (String token, UserDetails userDetails){
        final  String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return  extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return  extractClaim(token, Claims::getExpiration);
    }

    private Claims extractedAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}