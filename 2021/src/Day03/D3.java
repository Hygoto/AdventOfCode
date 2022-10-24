package Day03;
import java.util.Scanner;
import java.io.File;
public class D3 {
    public static void main(String[] args) throws Exception {
        int gamma = 0;
        int epsylon = 0;
        int s0 = 0;
        int s1 = 0;
        int s2 = 0;
        int s3 = 0;
        int s4 = 0;
        int s5 = 0;
        int s6 = 0;
        int s7 = 0;
        int s8 = 0;
        int s9 = 0;
        int s10 = 0;
        int s11 = 0;
        int z = 0;
        String tmp;
        File input = new File("./src/Day03/input");
        Scanner i = new Scanner(input);
        while (i.hasNextLine()){
            tmp = i.nextLine();
            if (tmp.charAt(0) == '1') s0++;
            if (tmp.charAt(1) == '1') s1++;
            if (tmp.charAt(2) == '1') s2++;
            if (tmp.charAt(3) == '1') s3++;
            if (tmp.charAt(4) == '1') s4++;
            if (tmp.charAt(5) == '1') s5++;
            if (tmp.charAt(6) == '1') s6++;
            if (tmp.charAt(7) == '1') s7++;
            if (tmp.charAt(8) == '1') s8++;
            if (tmp.charAt(9) == '1') s9++;
            if (tmp.charAt(10) == '1') s10++;
            if (tmp.charAt(11) == '1') s11++;
            z++;
        }
        if (s0 > (z/2)) gamma += Math.pow(2, 11);
        else epsylon += Math.pow(2, 11);
        if (s1 > (z/2)) gamma += Math.pow(2, 10);
        else epsylon += Math.pow(2, 10);
        if (s2 > (z/2)) gamma += Math.pow(2, 9);
        else epsylon += Math.pow(2, 9);
        if (s3 > (z/2)) gamma += Math.pow(2, 8);
        else epsylon += Math.pow(2, 8);
        if (s4 > (z/2)) gamma += Math.pow(2, 7);
        else epsylon += Math.pow(2, 7);
        if (s5 > (z/2)) gamma += Math.pow(2, 6);
        else epsylon += Math.pow(2, 6);
        if (s6 > (z/2)) gamma += Math.pow(2, 5);
        else epsylon += Math.pow(2, 5);
        if (s7 > (z/2)) gamma += Math.pow(2, 4);
        else epsylon += Math.pow(2, 4);
        if (s8 > (z/2)) gamma += Math.pow(2, 3);
        else epsylon += Math.pow(2, 3);
        if (s9 > (z/2)) gamma += Math.pow(2, 2);
        else epsylon += Math.pow(2, 2);
        if (s10 > (z/2)) gamma += Math.pow(2, 1);
        else epsylon += Math.pow(2, 1);
        if (s11 > (z/2)) gamma += Math.pow(2, 0);
        else epsylon += Math.pow(2, 0);
        System.out.println("Gamma: " + gamma);
        System.out.println("Epsylon: " + epsylon);
        System.out.println(gamma*epsylon);
        i.close();
    }
}
