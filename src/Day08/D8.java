package Day08;

import java.io.File;
import java.util.Scanner;

public class D8 {
    public static void main(String[] args) throws Exception {
        String seg;
        int  c = 0;
        File input = new File("./src/Day8/input");
        Scanner i = new Scanner(input);
        while (i.hasNext()) {
            seg = i.next();
            System.out.println(seg);
            if (seg.equals("|")) {
                for (int s = 0; s < 4; s++) {
                    seg = i.next();
                    if (seg.length() == 2 | seg.length() == 7 | seg.length() == 3 | seg.length() == 4) c++;
                }
            }
        }
        i.close();
        System.out.println(c);
    }
}
