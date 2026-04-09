package com.example.MoleCheckerAI.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.SignatureException;
import java.util.Date;

@Component
public class JwtUtils {

    private  final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final int jwtExpirationMs = 86400000;

    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }
    public String getUserNameFromToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }
    public boolean validateToken(String token){
        try {
            Jwts
                    .parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
        }catch (MalformedJwtException e){
            System.out.println("Incorrect format token " + e.getMessage());
        } catch (SecurityException e ) {
            System.out.println("Incorrect: " + e.getMessage());
        }catch (Exception e){
            System.out.println("Error validation token: " + e.getMessage());
        }
return false;
    }
}
