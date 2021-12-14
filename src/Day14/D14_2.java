package Day14;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;
import org.apache.commons.lang3.*;

public class D14_2 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day14/input");
        Scanner i = new Scanner(input).useDelimiter(" -> |\\n");
        int iterations = 40;
        int length = 100;
        long e, lowest, highest;
        String b;
        boolean z = true;
        String[] alphabet = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
        String[][] c = new String[2][length];
        long[][] n = new long[3][length];

        b = i.next();
        i.next();
        for (int s = 0; s < length; s++) {
            c[0][s] = i.next();
            c[1][s] = i.next();
        }
        i.close();
        for (int s = 0; s < length; s++) {
            n[0][s] = StringUtils.countMatches(b, c[0][s]);
        }
        for (int s = 0; s < iterations; s++) {
            Arrays.fill(n[2], 0);
            for (int w = 0; w < length; w++) {
                n[1][w] += n[0][w];
                for (int a = 0; a < length; a++) {
                    if ((String.valueOf(c[0][w].charAt(0))+c[1][w]).equals(c[0][a])) {
                        n[2][a] += n[0][w];
                    }
                    if ((String.valueOf(c[1][w]+c[0][w].charAt(1))).equals(c[0][a])) {
                        n[2][a] += n[0][w];
                    }
                }
            }
            for (int w = 0; w < length; w++) n[0][w] = n[2][w];
        }
        lowest = 0;
        highest = 0;
        for (int s = 0; s < 26; s++) {
            e = StringUtils.countMatches(b, alphabet[s]);
            for (int w = 0; w < length; w++) {
                if (c[1][w].equals(alphabet[s])) e += n[1][w];
            }
            if (z && e != 0) {
                lowest = e;
                z = false;
            }
            if (e < lowest && e != 0) lowest = e;
            else if (e > highest) highest = e;
        }
        System.out.println(lowest);
        System.out.println(highest);
        System.out.println(highest-lowest);
    }
}
